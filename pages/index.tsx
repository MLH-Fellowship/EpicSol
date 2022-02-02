import type { NextPage } from 'next';

//components
import Carousel from '../components/Carousel';

const Home: NextPage = () => {
  return (
    <div
      className='bg-appBlack min-h-screen pt-[100px]'
    >
      <div
        className='w-[75%] mx-auto'
      >
        <Carousel />
      </div>
    </div>
  )
}

export default Home
