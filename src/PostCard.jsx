

function PostCard({item}){
    return(
        <div key={item.id}>
            <h3>
            {item.title}
            </h3>
            <p>
            {item.body}
            </p>
      </div>
    )
}

export default PostCard