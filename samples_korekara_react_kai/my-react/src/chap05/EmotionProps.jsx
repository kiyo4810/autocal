/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

const MyPanel = styled.div`
  width: 300px;
  padding: 10px;
  border: 1px solid #000;
  color: white;
  border-radius: ${ props => (props.theme.radius ? '10px' : '0px') };
  background-color: ${ props => props.theme.color };
`;

export default function EmotionProps() {
  return (
    <MyPanel theme={{
      radius: true,
      color: 'royalblue'
    }}><b>React</b>は、フロントエンド開発のためのJavaScriptライブラリです。</MyPanel>
  );
}