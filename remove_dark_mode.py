import re

app_file = r'd:\Projects\Portfolio\adi_resume\Portfolio\src\App.tsx'

with open(app_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace state and useEffects
old_state = '''  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Only run on client-side
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem("theme", theme);
  }, [theme]);'''

new_state = '''  const theme = "light";

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }, []);'''

content = content.replace(old_state, new_state)

# 2. Remove the toggle button
button_pattern = r'''\s*<button\s*onClick=\{\(\) => setTheme[^\>]*\>\s*\{theme === "dark" \? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />\}\s*</button>'''
content = re.sub(button_pattern, '', content, flags=re.DOTALL)

with open(app_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Dark mode toggle removed and theme locked to light mode.")
