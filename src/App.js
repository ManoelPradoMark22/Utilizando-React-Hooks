import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [techs, setTech] = useState([]); // desestruturação
  /* sempre coloque o estado inicial, nesse caso pode ser um array vazio
  ou já com algumas tecnologias inicialmente.
  Para cada tipo de info dentro do componente teremos um estado separado.
  agora para cada estado temos um useState() separado.
  primeira pos: retorna o estado em si, nesse caso a nossa lista de tecnologias - techs
  segunda pos: função para atualizar as infos do estado */
  const [newTech, setNewTech] = useState(''); // estado inicial

  /* Dessa forma gasta mto processamento do JS, já que essa fç é re-criada do zero
  sempre q alterarmos as variaveis utilizadas nela, mesmo quando apenas colocamos
  uma letra no input.
  function handleAdd() {
    setTech([...techs, newTech]);
    setNewTech('');
  }
  Então usaremos o useCallback(), assim a fç handleAdd só vai ser recriada na
  memória qnd a variavel techs ou newTech sofrerem alterações.
  utilizar o useCallback() apenas em fçs q utilizam os estados, propriedades do
  componente ou qualquer tipo de variavel do useState */
  const handleAdd = useCallback(() => {
    setTech([...techs, newTech]);
    setNewTech('');
  }, [newTech, techs]);

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

  /* a variavel techsSize so vai executar a funcao techs.length de novo caso
  a variavel techs esteja com um VALOR diferente! */
  const techsSize = useMemo(() => techs.length, [techs]);

  /* toda vez q alteramos a variavel techs o return executa novamente, como o render */
  return (
    <>
      <ul>
        {techs.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      {/* Não é recomendado fazer dessa forma a seguir, pq toda vez q fosse renderizado
      iria executar novamente (e para calculos mais complexos é ruim). entao
      usaremos o useMemo() pq executaremos o trecho de codigo techs.lenght
      APENAS quando a variável techs mudar (e da forma tradicional a seguir
      executaria sempre q escrevessemos uma letra no input, renderizassemos a
      pagina etc) */}
      <strong>Você tem {techsSize} tecnologias</strong>
      <br />

      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
