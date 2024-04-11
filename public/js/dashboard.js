document.getElementById('newPostForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;

    fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: postTitle,
            content: postContent
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Actualizar el DOM o redireccionar al usuario según sea necesario
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
