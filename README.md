# I_Sharik_Vzrivaetsa

4-finger swipe right → Open File Manager (Nemo) tiled left:textnemo & sleep 1; xdotool search --class nemo windowactivate && xdotool key Super+Left
4-finger swipe left → Open your browser tiled right (change brave to firefox, chrome, etc.):textbrave & sleep 1; xdotool search --class brave windowactivate && xdotool key Super+Right
4-finger swipe down → Open Terminal:textgnome-terminal(Or kitty, alacritty, whatever your terminal is.)
4-finger swipe up → Show desktop (or replace with any script):textxdotool key Super+d
4-finger tap → Run any custom script (example: toggle Wi-Fi, take screenshot, etc.):text/home/yourusername/bin/my-custom-script.sh(Make it executable with chmod +x ~/bin/my-custom-script.sh)
3-finger swipe up → Workspace overview / Expo view (if you want to override default):textxdotool key Super+s