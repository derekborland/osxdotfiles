#! /usr/bin/env bash

# Load shell dotfiles
for file in ~/.dosx/bin/.{bash_profile,bash_prompt,exports,aliases,functions,extras}; do
  [ -r "$file" ] && [ -f "$file" ] && source "$file";
done;
unset file;