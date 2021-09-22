

window.addEventListener("DOMContentLoaded", async (event) =>{
    const commentList = document.querySelector('.commentList')
    const commentBtn = document.querySelector('#submitBtn')


    if (commentBtn) {
      commentBtn.addEventListener("click", async event => {

          const _csrf = document.querySelector('#token').value;
          event.preventDefault();
          const userInput = document.querySelector('.form-control').value
          document.querySelector('.form-control').value = '';
          const newTextArea = document.createElement('p');
          const storyId = event.target.dataset.storyId;
          newTextArea.innerText = userInput;
          commentList.appendChild(newTextArea);
          const body = { body: userInput, _csrf }
          

            try {
                const commentResponse = await fetch(`/stories/${storyId}/comments`, { 
                  method: "POST",
                  body: JSON.stringify(body),
                  headers: { "Content-Type": "application/json" },
                });
              
                // Converts to JSON
                const commentData = await commentResponse.json();
 
            } catch (e) {
                console.log("Failed to fetch comments", e);
            }

        
      });
  }
})
