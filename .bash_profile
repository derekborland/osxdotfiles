# Add `~/bin` to `$PATH`
export PATH="$HOME/bin:$PATH";

# Load shell dotfiles
for file in ~/.{path,bash_prompt,exports,aliases,functions,extras}; do
  [ -r "$file" ] && [ -f "$file" ] && source "$file";
done;
unset file;

# Case insensitive glogging
shopt -s nocaseglob;

# Autocorrect typos in path name when using `cd`
shopt -s cdspell;

# Add tab completion for many Bash commands
if which brew > /dev/null && [ -f "$(brew --prefix)/etc/bash_completion" ]; then
  source "$(brew --prefix)/etc/bash_completion";
elif [ -f /etc/bash_completion ]; then
  source /etc/bash_completion;
fi;

# Enable tab completion for `g` by marking it as an alias for `git`
if type _git &> /dev/null && [ -f /usr/local/etc/bash_completion.d/git-completion.bash ]; then
  complete -o default -o nospace -F _git g;
fi;

# Load RVM into a shell session *as a function*
[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" 

# This loads NVM
[[ -s /Users/derek/.nvm/nvm.sh ]] && . /Users/derek/.nvm/nvm.sh