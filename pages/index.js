import Head from 'next/head'
import firebase from "firebase"
import styles from '../styles/Home.module.css'
import {useCollection} from "react-firebase-hooks/firestore"
import { db } from '../firebase'
import { useRef, useState } from 'react'

export async function getServerSideProps(context){
  const messages = await db.collection("translations").orderBy("timestamp","asc").get()

  const data = {
    docs: messages.docs.map((doc)=>({
      id:doc.id,
      ...doc.data(),
    }))
  }

  return {
    props:{
messages:JSON.stringify(data)
    }
  };


}

export default function Home({messages}) {
  
 const [messagesSnapshot,loading,error] = useCollection(db.collection("translations").orderBy("timestamp","asc"))

//  console.log(JSON.parse(messages))
const handelChange = e =>{
  setlocal(e.target.value)
}

 const [local, setlocal] = useState('en')

 const inputRef = useRef(null)

  const onSubmit = (e)=>{
    e.preventDefault();

    db.collection("translations").add({
      message: inputRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    inputRef.current.value='';
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Lets BUild a Translation App</h1>
      {messagesSnapshot ? messagesSnapshot.docs.map((doc)=>(
        
          <div key={doc.id}>
            <p>{doc.data().translated?.[local]}</p>
          </div>
      )):  JSON.parse(messages).docs.map((doc)=>(
        
        <div key={doc.id}>
          <p>{doc.translated?.[local]}</p>
        </div>
    ))}
      <select  value={local} onChange={handelChange}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="hi">Hindi</option>
        <option value="de">German</option>
        <option value="fr">France</option>
      </select>


      <form>
        <input ref={inputRef} type="text" />

        <button onClick={onSubmit} type="submit">Send Message</button>
      </form>

    </div>
  )
}
