import markit from 'markit';

markit.setOptions({
  renderer: new markit.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

export default markit;
