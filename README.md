# Gendiff utility

[![Actions Status](https://github.com/Matheria/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Matheria/frontend-project-lvl2/actions)
[![Node CI](https://github.com/Matheria/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Matheria/frontend-project-lvl2/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/1859f55d8f77bb82f755/maintainability)](https://codeclimate.com/github/Matheria/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1859f55d8f77bb82f755/test_coverage)](https://codeclimate.com/github/Matheria/frontend-project-lvl2/test_coverage)

## About

This utility generates a difference of two files with various output formats

Supported files:

* JSON (`.json` file extension)

* YAML (`.yml` and `.yaml`)

Output formats:

* `stylish` (default) — handy diff tree with `+` and `-` change notation
* `plain` — human-readable report: what happened with items
* `json` — JSON-compatible output of the internal difference tree

## Install

``` sh
git clone https://github.com/Matheria/frontend-project-lvl2.git
make install
```

## Usage

``` sh
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (choices: "json", "plain", "stylish", default: "stylish")
  -h, --help           display help for command
```

## Examples of work

### Two flat json-files comparsion

[![asciicast](https://asciinema.org/a/9DWEM1WkBzXTYjxHOkhDhBvQX.svg)](https://asciinema.org/a/9DWEM1WkBzXTYjxHOkhDhBvQX)

### Two flat yaml-files comparsion

[![asciicast](https://asciinema.org/a/aIMcmrsrPpJ8vMK1eiXHrwe2Y.svg)](https://asciinema.org/a/aIMcmrsrPpJ8vMK1eiXHrwe2Y)

### Nested structures (JSON & YAML) in stylish format

[![asciicast](https://asciinema.org/a/DmH0UvobeY44AQGlyfcb5bLon.svg)](https://asciinema.org/a/DmH0UvobeY44AQGlyfcb5bLon)

### Nested structures (JSON & YAML) in plain format

[![asciicast](https://asciinema.org/a/U2hYbAqHbK2mZN7nv48KXsOtr.svg)](https://asciinema.org/a/U2hYbAqHbK2mZN7nv48KXsOtr)

### Nested structures (JSON & YAML) in json format

[![asciicast](https://asciinema.org/a/OSdgeW7OcBLCLUl9fCq5Ksrbm.svg)](https://asciinema.org/a/OSdgeW7OcBLCLUl9fCq5Ksrbm)
