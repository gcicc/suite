# TELEMETRx network chrome for Shiny apps.
#
#   source("https://gcicc.github.io/suite/network.R")   # or a vendored copy
#   ui <- page_fillable(theme = range_theme(), range_chrome("newsscraper"), ...)
#
# range_chrome() emits the same <link> + <script> every other section uses, so
# the masthead and footer come from the one network.js and cannot drift.

range_chrome <- function(section, built = NULL, next_refresh = NULL,
                         base = "https://gcicc.github.io/suite/") {
  htmltools::tagList(
    htmltools::tags$link(rel = "stylesheet", href = paste0(base, "network.css")),
    htmltools::tags$script(
      src = paste0(base, "network.js"), defer = NA,
      `data-section` = section, `data-built` = built, `data-next` = next_refresh
    )
  )
}

range_theme <- function() {
  bslib::bs_theme(
    version = 5,
    bg = "#101722", fg = "#e9eef5", primary = "#ffa14a",
    base_font = bslib::font_google("Archivo"),
    code_font = bslib::font_google("IBM Plex Mono")
  )
}
