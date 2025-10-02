from pathlib import Path
text = Path('tailwind.config.js').read_text()
start = text.index('fontFamily')
print(repr(text[start:start+200]))
