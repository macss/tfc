import CodeDisplay from '@lib/components/CodeDisplay'
import hammingEncode from '@lib/utils/hammingEncoder'
import parityEncode from '@lib/utils/parityEncoder'
import repetitionEncode from '@lib/utils/repetitionEncoder'
import textToBytes from '@lib/utils/textToBytes'
import { Typography, Box, Divider, TextField, Grid } from '@mui/material'
import type { NextPage } from 'next'
import { useState } from 'react'

/**
 * Página inicial do aplicativo, exibe um breve histórico a respeito dos algorítmos,
 * assim como um comparativo
 */
const Home: NextPage = () => {
  const [rawBytes, setRawBytes] = useState('')

  return (
    <Box>
      <Typography variant="h6">
        Introdução
      </Typography>
      <Divider />
      <br />
      <Typography 
        sx={{
          textAlign: 'justify'
        }}
        variant="body1"
        gutterBottom
      >
          O conceito de algorítmos de correção de erros surgiu no glorioso trabalho de Claude Shannon, &quot;Uma teoria matemática da comunicação&quot; publicado no ano de 1948. 
        Esses códigos funcionam ao adicionar algum tipo de redundância à mensagem transmitida de forma que o receptor, mesmo sem saber o conteúdo original da mensagem consiga 
        identificar a presença ou não de erros, alguns algorítmos mais sofisticados conseguem, além de encontrar o erro, corrigí-lo. <br />
        
          Neste website estão apresentados três códigos deste tipo: código de repetição, digito de paridade e código de Hamming. Abaixo temos um playground onde podemos ver lado a
        lado os códigos gerados por cada um dos métodos. Pela navegação superior o usuário pode escolher um método específico e interagir com as informações, inserindo erros e observando
        as influências dos erros na mensagem recebida.

      </Typography>

      <Typography variant="h6">
        Repetição
      </Typography>
      <Divider />
      <br />
      <Typography 
        sx={{
          textAlign: 'justify'
        }}
        variant="body1"
        gutterBottom
      >
          O código de repetição é o mais básico dos CCE que, apesar de ser considerado um método
          problemático, foi muito utilizado em telecomunicações. O problema consiste em sua ineficiência
          pois, na melhor das hipóteses, necessita de 66,7% de redundância. A ideia por trás é simples,
          ao se transmitir uma mensagem o conteúdo é enviado com pelo menos duas cópias de si, a
          mensagem recebida é comparada com as cópias e o resultado que representa a maioria é tomado
          como certo. Para este trabalho a taxa de repetição utilizada será de 3, ou seja, a mensagem será
          enviada três vezes, a original seguida de duas cópias.
      </Typography>

      <Typography variant="h6">
        Dígito de Paridade
      </Typography>
      <Divider />
      <br />
      <Typography 
        sx={{
          textAlign: 'justify'
        }}
        variant="body1"
        gutterBottom
      >
          O método do dígito de paridade adiciona um único bit de redundância em cada um dos seus pacotes de transmissão. Existem dois tipos de paridade, paridade par ou paridade ímpar,
        para o código de paridade par o valor do dígito de redundância - 0 ou 1 - é determinado de forma que a quantidade de 1&lsquo;s do pacote recebido seja par, de forma análoga e
        contrária é determinado o bit para um paridade ímpar.
      </Typography>

      <Typography variant="h6">
        Código de Hamming
      </Typography>
      <Divider />
      <br />
      <Typography 
        sx={{
          textAlign: 'justify'
        }}
        variant="body1"
        gutterBottom
      >
            O código de Hamming, precursor dos CCE modernos, desenvolvido no final dos da década de 1940, o trabalho surgiu devido à insatisfação de seu criador <i>Richard Hamming</i> com 
          a tecnologia da época. Como é explicado em seu artigo, os equipamentos da época, mais especificamente o computador <i>Bell Model V</i>, continha sistemas de detecção de erros que,
          durante os dias da semana, detectavam os erros e sinalizavam para o operador do equipamento corrigí-lo, enquanto que nos finais de semana, quando um erro era detectado, o computador
          simplesmente partia para a próxima operação. <br />

          Como Hamming trabalhava aos finais de semana, a indignação de ter que reiniciar suas operações ao se encontrar um erro o levou a questionar &quot;já que os erros podem ser 
        detectados, porquê não corrigí-los?&quot;. Em seu trabalho ele publicou a respeito do código de Hamming (7,4), onde em um pacote de 7 bits, 4 são de dados e 3 de redundância.
      </Typography>

      <Typography variant="h6">
        Playground
      </Typography>
      <Divider />
      <br />
      <TextField 
        label="Mensagem"
        helperText="Digite a mensagem a ser codificada"
        placeholder="Digite sua mensagem"
        fullWidth
        onChange={e => setRawBytes(textToBytes(e.target.value))}
      />
      <br /><br />
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={3}>
          <Typography variant="body2">
            Bytes não codificados
          </Typography>
          <Divider />
          <br />
          
          <CodeDisplay 
            code={rawBytes}
            hideLabels
            codeType="raw"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Typography variant="body2">
            Dígito de Paridade
          </Typography>
          <Divider />
          <br />
          
          <CodeDisplay 
            code={parityEncode(rawBytes)}
            hideLabels
            codeType="parity"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Typography variant="body2">
            Código de Repetição
          </Typography>
          <Divider />
          <br />
          
          <CodeDisplay 
            code={repetitionEncode(rawBytes)}
            hideLabels
            codeType="repetition"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Typography variant="body2">
            Código de Hamming
          </Typography>
          <Divider />
          <br />
          
          <CodeDisplay 
            code={hammingEncode(rawBytes)}
            hideLabels
            codeType="hamming"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
