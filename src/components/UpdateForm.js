// import React, {useState} from 'react'
// import { useOutletContext } from 'react-router'

// const UpdateForm = () => {
//     const [quantity, setQuantity] = useState()
//     const [itemId, setItemId] = useState()
//     const [cart, setCart] = useState()
//     const {products} = useOutletContext()
//     async function updateQuantity(event){
//         event.preventDefault();
//         try {
//         const quanFetch = await fetch(`https://gg-3pln.onrender.com/api/orders/update/${itemId}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${localStorage.getItem('token')}`
//             },
//             body: JSON.stringify({
//                 quantity
//             })
//         })
//         console.log(quanFetch)
//         if(quanFetch){
//             async function regetCart(){
//                 const cartFetch2 = await fetch(`https://gg-3pln.onrender.com/api/orders/viewcart`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'applicaion/json',
//                         'Authorization': `Bearer ${localStorage.getItem('token')}`
//                     }
//                 })
//                 const jsonCart2 = await cartFetch2.json()
//                 setCart(jsonCart2.cart.products)
//                 setCartId(jsonCart2.cart.cartId)
//             }
//             regetCart()
//             navigate('/cart')
//         }
//     } catch (error) {
//         console.log(error)
//     }
//     }
//     return(
//         products && products.length ? products.map((indivProd, idx) => {
//         <div>
//             <form onSubmit={updateQuantity}>
//                             <input type='number' value={quantity} onChange={(event) => {setQuantity(event.target.value)}}></input>
//                             <input type='submit' onClick={(event) => {
//                                console.log(event)
//                             }}></input>
//                         </form>
//         </div> 
//         }):<div>L</div>
//     )
  
// }

// export default UpdateForm