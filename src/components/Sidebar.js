import React, { useEffect } from 'react'
import { useState } from 'react'
import {AiOutlineRight,AiOutlineLeft} from 'react-icons/ai'


export const Sidebar = ({categories,showSideMenu,toggleSideMenu}) => {
    const [menuLabel,setMenuLabel] = useState(<span>Categories</span>)
    const [menu,setMenu] = useState(null)

    useEffect(()=>{
        setMenu(categories.map(category=>(
            <li key={category.title} onClick={()=>{subCategoriesList(category)}}>
            <a>
                {category.title}
                <AiOutlineRight></AiOutlineRight>
                </a>
                </li>)))
    },[categories])
    function returnToCategories(){
        setMenuLabel(<span>Categories</span>)
        setMenu(categories.map(category=>(
            <li key={category.title} onClick={()=>{subCategoriesList(category)}}>
            <a>
                {category.title}
                <AiOutlineRight></AiOutlineRight>
                </a>
                </li>)))
    }

    function subCategoriesList(category){
        setMenuLabel(<a onClick={returnToCategories}><AiOutlineLeft></AiOutlineLeft><span>{category.title}</span></a>)
        
        setMenu(category.sub_categories.map(sub=>
             (<li key={sub.title} >
            <a href={sub.url}>
                {sub.title}
                <AiOutlineRight></AiOutlineRight>
                </a>
                </li>)
                ))
    }


  return (
    <div className={`modal ${showSideMenu?'is-active':''}`} 
         id="sidebar-modal" 
         style={{top: "5.5rem",
        alignItems: "inherit",}}
        >
        <div className="modal-background" onClick={toggleSideMenu}></div>
        <aside className="modal-content menu" style={{backgroundColor: "white",
        margin: "0",
        padding: "20px 20px", 
        width:"19rem",
        maxHeight: "calc(100vh - 40px)",
        height: "calc(100vh - 40px)",}}>
            <p className="menu-label">
                {menuLabel}
        </p>
        <ul className="menu-list" id="menu-list-1">
            {menu}
        </ul>
        <ul className="menu-list is-hidden" id="menu-list-2">

        </ul>
        
        </aside>
        </div>
  )
}
