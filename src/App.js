import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useParams
} from "react-router-dom";
import "./styles.css";
import { fstore } from "./utils/fb";

export default function App() {
  return (
    <BrowserRouter>
      <h1>DK Blog</h1>

      <hr />
      <List />
      <hr />

      <Switch>
        <Route path="/post/:title/:docid" component={ViewPost} />
        {/* <Route exact path="/" component={List} /> */}
      </Switch>
    </BrowserRouter>
  );
}

function List() {
  let [titles, setTitles] = useState([]);

  async function loadTitles() {
    const snapshot = await fstore
      .collection("blog-posts")
      .orderBy("date", "desc")
      .get();
    setTitles(snapshot.docs);
  }

  useEffect(() => {
    loadTitles();
  }, []);

  let [x, setX] = useState(1);
  return (
    <div className="App">
      <h1>Hello World - {x}</h1>
      {titles.map((t) => (
        <div key={t.id}>
          <Link to={`/post/${t.data().title.replaceAll(" ", "-")}/${t.id}`}>
            {t.data().title}
          </Link>
        </div>
      ))}
    </div>
  );
}

function ViewPost() {
  let params = useParams();
  let [content, setContent] = useState("loading...");

  async function loadContent() {
    setContent("Loading..");
    let doc = await fstore.collection("blog-contents").doc(params.docid).get();
    setContent(doc.data().content);
  }

  useEffect(() => {
    loadContent();
  }, [params.docid]);

  return (
    <div>
      <h3>{params.title}</h3>
      <div>{content}</div>
    </div>
  );
}
