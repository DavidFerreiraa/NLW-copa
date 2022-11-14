interface homeProps {
  count: number;
}

export default function Home(props: homeProps) {

  return (
    <h1>Número de bolões: {props.count}</h1>
  )  
}

export const getServerSideProps = async () => {

  const response = await fetch('http://localhost:3333/pools/count')
  const data = await response.json()
  console.log(data)

  return {
    props: {
      count: data.count,
    }
  }
}
