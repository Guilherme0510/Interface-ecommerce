import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext'
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/Description/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Produtos = () => {

  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e) => e.id === Number(productId))

  return (
    <div>
      <Breadcrum product = {product}/>
      <ProductDisplay product = {product}/>
      <DescriptionBox />
      <RelatedProducts />
    </div>
  )
}

export default Produtos
