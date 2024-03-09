import { sprinkles } from '../../design/sprinkles.css.ts';

const container = sprinkles({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '800px',
  padding: '5px',
  placeContent: 'center',
});

const topic = sprinkles({
  fontSize: 'calc(1.25rem + 1.25vw)',
  alignSelf: 'center',
  fontWeight: 500,
});

const section = sprinkles({
  padding: '20px',
  borderRadius: '$4',
  shadowColor: '$black',
});

const section_h2 = sprinkles({
  fontSize: '$8',
  paddingBottom: '$2',
  color: '$twd-blue-400',
  borderBottomStyle: 'solid',
  borderColor: '$twd-blue-700',
  borderWidth: '$0',
  borderBottomWidth: '$0.5',
});

const section_h3 = sprinkles({
  fontSize: '$6',
  paddingBottom: '$2',
  color: '$twd-blue-400',
});

const section_footer = sprinkles({
  fontSize: '$7',
  paddingX: '$2',
  fontWeight: 600,
  textAlign: 'center',
});

const section_footer_hover = sprinkles({
  textDecoration: 'underline',
});

const emphasis = sprinkles({
  fontWeight: 700,
  textDecoration: 'underline',
});

const list = sprinkles({
  paddingLeft: '$4',
});

const tip = sprinkles({
  display: 'flex',
  backgroundColor: '$twd-blue-700',
  opacity: 0.8,
  padding: '$2',
  borderRadius: '$4',
});

const tip_text = sprinkles({
  fontStyle: 'italic',
  flexGrow: 1,
  textAlign: 'center',
});

const link = sprinkles({
  color: '$twd-blue-400',
  textDecoration: 'underline',
});

const two_column_outer = sprinkles({
  display: 'flex',
  flexDirection: 'row',
  placeItems: 'space-around',
});

const two_column_side = sprinkles({
  flex: '$1',
  maxWidth: '100%',
});

export {
  container,
  topic,
  section,
  section_h2,
  section_h3,
  section_footer,
  section_footer_hover,
  emphasis,
  list,
  tip,
  tip_text,
  link,
  two_column_outer,
  two_column_side,
};
// .container {
//   max-width: 800px;
//   margin: auto;
//   padding: 5px;
// }

// .topic {
//   font-size: calc(1.25rem + 1.25vw);
//   align-self: center;
//   font-weight: 500;
// }

// .section {
//   margin: 20px 0;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
// }

// .section_h2 {
//   font-size: 22px;
//   padding-bottom: 5px;
//   color: rgb(var(--accent-light));
//   border-bottom: solid;
//   border-color: rgb(var(--accent-dark));
// }

// .section_h3 {
//   font-size: 18px;
//   padding-bottom: 5px;
//   color: rgb(var(--accent-light));
// }

// .section_footer {
//   font-size: 20px;
//   padding-block: 10px;
//   font-weight: 600;
//   text-align: center;
// }

// .section_footer:hover {
//   text-decoration-line: underline;
// }

// .emphasis {
//   font-weight: 700;
//   text-decoration: underline;
// }

// .list {
//   padding-inline-start: 20px;
// }

// .list_item::before {
//   content: '☞';
//   margin-right: 5px;
// }

// .tip {
//   display: flex;
//   background-color: rgb(var(--accent-dark));
//   opacity: 0.8;
//   padding: 10px;
//   border-radius: 8px;
// }

// .tip_text {
//   font-style: italic;
//   flex-grow: 1;
//   text-align: center;
// }

// .tip::before {
//   content: '💡';
//   margin-right: 5px;
// }

// .link {
//   color: rgb(var(--accent-light));
//   text-decoration: underline;
// }

// .two_column_grid {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 20px;
// }
