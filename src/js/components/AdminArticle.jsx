import React, { useState, useEffect  } from 'react';
import firebase from '../configs/FireBase';
import "firebase/firestore";


export default function AdminArticle() {


    const DB = firebase.firestore();
    
    const [ textareaVal, setTextareaVal ] = useState("");
    const [articles, setArticles ] = useState([]);
    const [ title, setTitle ] = useState("");

    let toggle = true;

    useEffect(() => {
        callDB() ;
    // eslint-disable-next-line
    }, [null])


    function callDB() {

        DB.collection("Article").get().then(querySnapshot => {
            const articles = [];
            querySnapshot.forEach(doc => {
                articles.push({
                    id: doc.id,
                    title: doc.data().title,
                    content: doc.data().content,
                    createdDate: doc.data().createdDate
                })
            });
            setArticles(articles);
        });
    }

 
    function handleArticleSubmit(e) {
        e.preventDefault();
       
        if( textareaVal.trim() && title.trim() && toggle ) {
            toggle = false;
            const date = new Date().toLocaleString();
            DB.collection("Article").add({
                title: title,
                content: textareaVal,
                createdDate: date
            })
            .then(article => {
                setArticles([...articles, {
                    id: article.id,
                    title: title,
                    content: textareaVal,
                    createdDate: date
                }]);

                setTextareaVal("");
                setTitle("");
            })
            .catch(function(error) {
                window.alert(error.message);
            }).finally(() => {
                toggle = true;
            });
        } else {
            window.alert("please fill in the inputs");
        }
    }

    
    function onDeleteClick(e) {

        const id = e.currentTarget.parentNode.id

        const newArticleList = articles.filter(item => {
            return item.id !== id;
        });

        DB.collection("Article").doc(id).delete()
        .then(() => {
            setArticles(newArticleList);
        })
        .catch(function(error) {
            window.alert(error.message);
        });
    }

    const sortedArticleItems = [...articles];

    sortedArticleItems.sort((g1, g2) => (
        Date.parse(g2.createdDate) - Date.parse(g1.createdDate)
    ));

    const articleItems = sortedArticleItems.map(item => {
        return (
          <div className='adminUserItems' key={item.id} id={item.id}>
              <div className='articleItemData'>
                <p><b>Title:</b> {item.title}</p>
                <p><b>Content:</b> {item.content}</p>
                <p><b>Created Date:</b> {item.createdDate}</p>
                <p><b>ID:</b> {item.id}</p>
              </div>
              <button onClick={onDeleteClick}>Delete</button>
          </div>
        )
    })

    return (
        <div className="adminArticleCont">
            <div className='publishSide'>
                <form onSubmit={handleArticleSubmit}>
                    <label>Title:</label>
                    <input 
                        required
                        className="articleTitle"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                    <label>Article:</label>
                    <textarea 
                        name="message" 
                        rows="10" 
                        // cols="100" 
                        required
                        value={textareaVal}
                        onChange={(e) => setTextareaVal(e.target.value)} />
                    <input type="submit" value="Publish" className="submitButton" />
                </form>
            </div>
            <div className="monSide">
                <h1>Published Articles</h1>
                {articleItems}
            </div>
        </div>
    )
}