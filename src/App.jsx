import { useState } from 'react';
import axios from 'axios';

function App() {
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');
  const [bibleText, setBibleText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/bible?CI=${chapter}&CV=${verse}`);
      setBibleText(response.data.text);
    } catch (error) {
      console.error('Error fetching bible text:', error);
      setBibleText('구절을 찾을 수 없습니다.');
    }
  };

  return (
    <div className="App">
      <h1>성경 구절 검색기</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          placeholder="장 번호 입력 (예: 517)"
        />
        <input
          type="text"
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
          placeholder="절 번호 입력 (예: 99)"
        />
        <button type="submit">검색</button>
      </form>
      {bibleText && (
        <div>
          <h2>검색 결과</h2>
          <p>{bibleText}</p>
        </div>
      )}
    </div>
  );
}

export default App;