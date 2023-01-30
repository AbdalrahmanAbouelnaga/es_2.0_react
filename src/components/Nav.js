import React from "react"
import { Sidebar } from "./Sidebar"
import { GlobalContext } from "../context/GlobalContext"
import { useContext } from "react"
import { useState } from "react"

export function Nav() {

    const {isAuthenticated,removeToken} = useContext(GlobalContext)


    const [navCategories,setNavCategories]=useState([
        {
            "url": "/categories/computers-office-supplies/",
            "title": "Computers & Office Supplies",
            "subCategories": [
                {
                    "url": "/categories/computers-office-supplies/subcategories/laptops/",
                    "title": "Laptops"
                },
                {
                    "url": "/categories/computers-office-supplies/subcategories/desktop-monitors/",
                    "title": "Desktop & Monitors"
                },
                {
                    "url": "/categories/computers-office-supplies/subcategories/printers-accessories/",
                    "title": "Printers & Accessories"
                },
                {
                    "url": "/categories/computers-office-supplies/subcategories/drives-storage/",
                    "title": "Drives & Storage"
                },
                {
                    "url": "/categories/computers-office-supplies/subcategories/keyboards-mice/",
                    "title": "Keyboards & Mice"
                }
            ]
        },
        {
            "url": "/categories/mobilestablets-more/",
            "title": "Mobiles,Tablets & More",
            "subCategories": [
                {
                    "url": "/categories/mobilestablets-more/subcategories/mobile-phones/",
                    "title": "Mobile Phones"
                },
                {
                    "url": "/categories/mobilestablets-more/subcategories/tablets/",
                    "title": "Tablets"
                },
                {
                    "url": "/categories/mobilestablets-more/subcategories/cases-covers/",
                    "title": "Cases & Covers"
                },
                {
                    "url": "/categories/mobilestablets-more/subcategories/power-banks-chargers/",
                    "title": "Power Banks & Chargers"
                }
            ]
        },
        {
            "url": "/categories/tvs-electronics/",
            "title": "Tvs & Electronics",
            "subCategories": [
                {
                    "url": "/categories/tvs-electronics/subcategories/televisions/",
                    "title": "Televisions"
                },
                {
                    "url": "/categories/tvs-electronics/subcategories/speakers/",
                    "title": "Speakers"
                },
                {
                    "url": "/categories/tvs-electronics/subcategories/headphones/",
                    "title": "Headphones"
                }
            ]
        },
        {
            "url": "/categories/mens-fashion/",
            "title": "Men's Fashion",
            "subCategories": [
                {
                    "url": "/categories/mens-fashion/subcategories/mens-jackets/",
                    "title": "Men's Jackets"
                },
                {
                    "url": "/categories/mens-fashion/subcategories/mens-shoes/",
                    "title": "Men's Shoes"
                }
            ]
        },
        {
            "url": "/categories/womens-fashion/",
            "title": "Women's Fashion",
            "subCategories": [
                {
                    "url": "/categories/womens-fashion/subcategories/womens-jackets/",
                    "title": "Women's Jackets"
                },
                {
                    "url": "/categories/womens-fashion/subcategories/womens-shoes/",
                    "title": "Women's Shoes"
                }
            ]
        }
      ])

      const [showMobileMenu,setMobileMenu]=useState(false)
      const [showSideMenu,setSideMenu]=useState(false)




    function toggleMobileMenu(){
        setMobileMenu(!showMobileMenu)
    }
    function toggleSideMenu(){
      setSideMenu(!showSideMenu)
  }

    return (
    <>
    <div className="navbar is-black is-fixed-top">
        <div className="navbar-brand">
        <a href='/' className="navbar-item pl-4">E Store</a>
        <div className="navbar-burger"
             aria-expanded="false" 
             aria-label="menu"
             data-target="menu" onClick={toggleMobileMenu}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
             </div>
        </div>
        <nav className={`navbar-menu p-0 ${showMobileMenu?'is-active':''}`} id="menu">
            <div className="navbar-start">
            <div className="group navbar-item has-background-black">
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
            <input placeholder="Search" type="search" className="input" />
            </div>
            </div>
            <div className="navbar-end">
                <div className="buttons custom-buttons columns is-multiline has-background-black m-0">
                    {isAuthenticated?(
                        <>
                        <a href="/myaccount" className="navbar-item column button is-black">MyAccount</a>
                        <a href="/cart" className="navbar-item column button is-black">Cart</a>
                        <a className="navbar-item column button is-black" onClick={removeToken}>Logout</a>
                        </>
                    ):(
                        <>
                        <a href="/signup" className="navbar-item column button is-black">Sign Up</a>
                    <a href="/login" className="navbar-item column button is-black">Login</a>
                    <a href="/cart" className="navbar-item column button is-black">Cart</a>
                    </>)
                    }
                </div>
            </div>
        </nav>
    </div>
    <div className="navbar is-dark height-size is-fixed-top margin-mobile" style={{zIndex: "3",minHeight: "2rem",height: "2rem",fontSize: "0.8rem",}}> 
    <div className="navbar-brand is-flex is-align-items-center height-size " style={{zIndex: "0",minHeight: "2rem",height: "2rem",fontSize: "0.8rem",}}>
      <button className="navbar-burger navbar-item columns is-flex height-size" aria-label="menu" aria-expanded="false" style={{paddingBottom: 0,
marginBottom: "0px",
marginTop: "0px",
paddingTop: "0",
height: "2rem",}} onClick={toggleSideMenu}>
        <div className="column">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
        <div className="">All</div>
      </button>
    </div>
    <div className="navbar-start custom-overflow ml-4 height-size">
            {
                navCategories.length>0?navCategories.map(
                    category=>category.subCategories.map((sub,index)=> index<2?<a href={sub.url} key={sub.title} className="navbar-item">{sub.title}</a>:'')
                ):''
            }
    </div>
  </div>
        <Sidebar toggleSideMenu={toggleSideMenu} navCategories={navCategories} showSideMenu={showSideMenu} />
    </>
  )}
