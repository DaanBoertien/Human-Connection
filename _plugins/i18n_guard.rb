# _plugins/i18n_guard.rb
#
# Build-time guard against missing translation sections.
#
# Why this exists:
# jekyll-multiple-languages-plugin aborts the WHOLE build with a cryptic
# "no implicit conversion of nil into String" TypeError when a template
# references a translation *section* (e.g. {% t inclusieve-organisaties.title %})
# whose top-level key is missing from a language file. In June 2026 a CMS save
# silently dropped two such sections from _i18n/nl.yml, which broke every deploy
# for ~6 days while the live site stayed frozen on the last good build.
#
# A missing nested *field* degrades gracefully (empty string); only a missing
# whole *section* is fatal. So this guard checks exactly that condition and, if
# violated, fails fast with a clear, actionable message instead of the opaque
# TypeError -- naming the language file and the section that must be restored.

require "yaml"

Jekyll::Hooks.register :site, :after_init do |site|
  source   = site.source
  i18n_dir = File.join(source, "_i18n")
  langs    = site.config["languages"] || ["nl"]

  # Find translation sections referenced by templates via {% t section.key %} or
  # {% translate section.key %}. Only the dotted form matters: that is what
  # descends into a section and triggers the fatal nil error when it is absent.
  tag_re = /\{%-?\s*t(?:ranslate)?\s+([A-Za-z0-9_-]+)\.[A-Za-z0-9_.-]+/

  referenced = {} # section => [files that reference it]
  globs = ["*.html", "*.md", "_layouts/**/*", "_includes/**/*", "_pages/**/*"]
  globs.flat_map { |g| Dir.glob(File.join(source, g)) }.uniq.each do |path|
    next unless File.file?(path)
    content = File.read(path, encoding: "UTF-8") rescue next
    content.scan(tag_re) do |m|
      (referenced[m[0]] ||= []) << File.basename(path)
    end
  end

  missing = []
  langs.each do |lang|
    file = File.join(i18n_dir, "#{lang}.yml")
    next unless File.exist?(file)
    data =
      begin
        YAML.safe_load(File.read(file, encoding: "UTF-8")) || {}
      rescue StandardError
        # If the file will not parse, Jekyll/the i18n plugin will report the real
        # YAML error itself; the guard should not second-guess it.
        next
      end
    next unless data.is_a?(Hash)

    referenced.each do |section, used_in|
      unless data.key?(section)
        missing << "#{lang}.yml is missing section '#{section}' " \
                   "(referenced in #{used_in.uniq.join(', ')})"
      end
    end
  end

  unless missing.empty?
    raise "i18n guard: required translation section(s) missing -- the build " \
          "would crash with a nil TypeError. Most likely a CMS save dropped a " \
          "section; restore it in the named _i18n file:\n" +
          missing.map { |m| "  - #{m}" }.join("\n")
  end
end
