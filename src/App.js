import React, { useState, useEffect } from 'react';

function App() {
  const [techs, setTech] = useState([]); // desestruturação
  /* sempre coloque o estado inicial, nesse caso pode ser um array vazio
  ou já com algumas tecnologias inicialmente.
  Para cada tipo de info dentro do componente teremos um estado separado.
  agora para cada estado temos um useState() separado.
  primeira pos: retorna o estado em si, nesse caso a nossa lista de tecnologias - techs
  segunda pos: função para atualizar as infos do estado */
  const [newTech, setNewTech] = useState(''); // estado inicial

  function handleAdd() {
    setTech([...techs, newTech]);
    setNewTech('');
  }

  // simula o componentDidMount
  useEffect(() => {
    const storagetechs = localStorage.getItem('techs');

    if (storagetechs) {
      setTech(JSON.parse(storagetechs));
    }
  }, []);

  // simula o componentDidUpdate
  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs));
  }, [techs]);

  /* toda vez q alteramos a variavel techs o return executa novamente, como o render */
  return (
    <>
      <ul>
        {techs.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
