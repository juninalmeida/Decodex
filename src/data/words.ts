type WordData = {
  word: string
  hint: string
}

const WORDS: WordData[] = [
  { word: 'VULCAN', hint: 'Deus romano do fogo e da forja' },
  { word: 'PYTHON', hint: 'Uma cobra ou uma linguagem de programação' },
  { word: 'MATRIX', hint: 'Uma simulação ou estrutura matemática' },
  { word: 'CYPHER', hint: 'Um código secreto ou personagem do Matrix' },
  { word: 'HACKER', hint: 'Alguém que invade sistemas' },
  { word: 'KERNEL', hint: 'O núcleo de um sistema operacional' },
  { word: 'ROUTER', hint: 'Direciona o trafego de rede' },
  { word: 'BINARY', hint: 'Um sistema de zeros e uns' },
  { word: 'CIPHER', hint: 'Um algoritmo de criptografia' },
  { word: 'DEVOPS', hint: 'Onde desenvolvimento encontra operações' },
  { word: 'DOCKER', hint: 'Containers para aplicações' },
  { word: 'GITHUB', hint: 'Onde desenvolvedores armazenam código' },
  { word: 'NEURAL', hint: 'Relacionado a redes do cérebro' },
  { word: 'PHOTON', hint: 'Uma partícula de luz' },
  { word: 'QUARTZ', hint: 'Um mineral usado em relógios' },
  { word: 'ROBOTS', hint: 'Maquinas que agem de forma autônoma' },
  { word: 'SCRIPT', hint: 'Um conjunto de instruções codificadas' },
  { word: 'SERVER', hint: 'Um computador que serve outros' },
  { word: 'SIGNAL', hint: 'Uma mensagem ou impulso transmitido' },
  { word: 'SYNTAX', hint: 'As regras gramaticais do código' },
]

function getRandomWord(): WordData {
  const index = Math.floor(Math.random() * WORDS.length)
  return WORDS[index]
}

export { getRandomWord }
export type { WordData }
