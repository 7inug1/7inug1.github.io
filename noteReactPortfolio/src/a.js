const arr = [
  {
    content: '본문 1',
    tag: [],
    title: '제목 1',
  },
  {
    content: '본문 2',
    tag: ['진욱'],
    title: '제목 2',
  },
];

/**
 * @typedef {object} Note
 * @property {string} content
 * @property {string[]} tag
 * @property {string} title
 */

/**
 *
 * @param {Note[]} notes
 * @param {string} tag
 */
function filterByTag(notes, tag) {
  if (!tag) {
    return [];
  }
  return notes.filter((note) => note.tag.includes(tag));
}

/**
 * TODO: 학습할 내용
 * - Array filter()
 * - Array map()
 * - Array reduce();
 */
console.log(filterByTag(arr, '진욱'));
console.log(filterByTag(arr));
