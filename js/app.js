(() =>{
    const search = document.querySelector('.form-bar');

    const btnItems = document.querySelectorAll('.store-items');

    const display = document.querySelectorAll('.store-display');

    const cartAdd = document.querySelectorAll('.cartadd');

    const nofItems = document.querySelector('.nofItems');

    const itemsprice = document.querySelector('.itemsprice');

    const shopIcon = document.querySelector('.navshop-icon');

    const viewCart = document.querySelector('.display-added-cart');

    const viewDetails = document.querySelector('.nav-item-details');

    const clearBtn = document.querySelector('.clear-btn');


    //example of parallex effect on js
    // const parallex = () => {
    //     const parallex = document.querySelector('.hero');
    //     const screen = window.scrollY
    //     parallex.style.backgroundPositionY = screen * 0.8 + "px";
    // }
    // window.addEventListener('scroll', parallex);

    //explore button
    const scroll = new SmoothScroll('.hero a[href*="#"]', {
        speed: 600
    })

    //for each click of button
    btnItems.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const fliter = e.target.innerHTML;
            display.forEach(item => {
                if (fliter === 'all') {
                    item.style.display = 'block';
                }
                else {
                    display.forEach(item => {
                        item.classList.contains(fliter) ? item.style.display = 'block' : item.style.display = 'none'

                    })
                }
            })
        })
    })

    //for search on form
    search.addEventListener('keyup', (e) => {
        const product = e.target.value.toLowerCase();
        display.forEach(item => {
            if (product === 'all') {
                item.style.display = 'block';
            }
            else {
                display.forEach(item => {
                    item.textContent.includes(product) ? item.style.display = 'block' : item.style.display = 'none'

                })
            }
        })
    })

    //add item to cart
    let count = 0;
    let sum = 0;
    cartAdd.forEach(cart => {
        cart.addEventListener('click', () => {
            let val = Number(cart.getAttribute('data-value'));
            let img = cart.getAttribute('data-img');
            
            nofItems.textContent = count === 0 ? ` ${++count} item -` : `${++count} items -`;
            const add = (val) => {
                sum += val;
                itemsprice.textContent = `Total : $${sum}`;
            }
            add(val);
            let cartDetails = {
                value : val,
                image : img,
                total : itemsprice.textContent
            }
            detailsList(cartDetails);

            setTimeout(function () {
                $('#exampleModal').modal('hide');
            }, 1500);

        })
    })

    const detailsList = (list) => {
        let html = document.createElement('div');

        html.innerHTML += `<div class="cart-details-display mt-3">
                <div class="cart-img-container">
                    <img src="./img/${list.image}" alt="img">
                </div>
                <div class="item-details">
                    <h5>Cart Item</h5>
                    <h6>$ ${list.value}</h6>
                </div>
                <div class="del-icon-cart">
                    <img src="./img/icons8-trash-26.png" class="cart-del-icon" alt="del">
                </div>
            </div>
          `

        viewCart.appendChild(html)

        clearBtn.addEventListener('click', () => {
            viewCart.removeChild(html)
            nofItems.innerHTML = ''
            itemsprice.innerHTML = ''
            viewCart.style.display = 'none'
        })
    }

    viewDetails.addEventListener('click', () => {
        if (viewCart.style.display === "none") {
            viewCart.style.display = "block";
        } else {
            viewCart.style.display = "none";
        }
        viewCart.classList.toggle('display-added-cart')

    })
})();