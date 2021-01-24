import { GetServerSideProps } from 'next';
import { Title } from '@/styles/pages/Home';
import SEO from '@/components/SEO';

interface IProducts {
  id: string;
  title: string;
}

interface IHomeProps {
  recommendedProducts: IProducts[];
}

export default function Home({recommendedProducts}: IHomeProps) {

  async function handleSum() {
    console.log(process.env.NEXT_PUBLIC_API_URL)
    const math = (await import('../lib/math')).default;
    alert(math.sum(3,5));
  }


  return (
    <div>
      <SEO 
        title="DevCommerce, your best e-comerce!" 
        image="boost.png"
        shouldExcludeTitleSuffix 
      />
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )
          })}
        </ul>
      </section>

      <button onClick={handleSum}>Sum!</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    }
  }
}
