
window.addEventListener("DOMContentLoaded", async (event) =>{
  const commentList = document.querySelector('.commentList')
  const commentBtn = document.querySelector('#submitBtn')

  // Event Listner for PUG edit button
  const editBtnPug = document.querySelectorAll('.editBtn')
  editBtnPug.forEach(btns => {
    btns.addEventListener("click", async event => {
      const commentBody = event.target.parentElement.previousSibling
      event.target.hidden= true
      event.target.nextSibling.hidden= true
      event.target.nextSibling.nextSibling.hidden= false
      event.target.nextSibling.nextSibling.nextSibling.hidden= false
      commentBody.setAttribute("contenteditable","true")
      event.preventDefault()
    })
  })
  //---------------------------------------------------------------------------------------------------------------

  // Event Listner for PUG delete button
  const deleteBtnPug = document.querySelectorAll('.deleteBtn')
  deleteBtnPug.forEach(btns => {
    btns.addEventListener("click", async (event) => {
      const commentBody = event.target.parentElement.previousSibling
      event.target.hidden= true
      event.target.previousSibling.hidden= true
      event.target.nextSibling.hidden= true
      event.target.nextSibling.nextSibling.hidden= true
      commentBody.setAttribute("contenteditable","true")
      commentBody.parentElement.remove()
      event.preventDefault()

      const commentId = event.target.dataset.commentId;

      try {
        const res = await fetch(`/api/comments/${commentId}/delete`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
      } catch (e) {
          console.log("Failed to fetch comments", e);
      }
    })
  })
  //---------------------------------------------------------------------------------------------------------------

  // Event Listner for PUG  eidt cancel button
  const editCancelBtnPug = document.querySelectorAll('.editCancelBtn')
  editCancelBtnPug.forEach(btns => {
    btns.addEventListener("click", async (event) => {
      const commentBody = event.target.parentElement.previousSibling
      event.target.hidden= true
      event.target.nextSibling.hidden= true
      event.target.previousSibling.hidden= false
      event.target.previousSibling.previousSibling.hidden= false
      commentBody.setAttribute("contenteditable","false")
      event.preventDefault()
    })
  })
  //---------------------------------------------------------------------------------------------------------------

  // Event Listner for PUG edit submit button
  const editSubmitBtnPug = document.querySelectorAll('.editSubmitBtn')
  editSubmitBtnPug.forEach(btns => {
    btns.addEventListener("click", async (event) => {
      const commentBody = event.target.parentElement.previousSibling
      event.target.hidden= true
      event.target.previousSibling.hidden= true
      event.target.previousSibling.previousSibling.hidden= false
      event.target.previousSibling.previousSibling.previousSibling.hidden= false
      commentBody.setAttribute("contenteditable","false")
      event.preventDefault()

      const commentId = event.target.dataset.commentId;
      const body = {
        body: commentBody.innerText
      }

      try {
        const res = await fetch(`/api/comments/${commentId}/edit`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
          console.log("Failed to fetch comments", e);
      }
    })
  })
  //---------------------------------------------------------------------------------------------------------------
  if (commentBtn) {
    commentBtn.addEventListener("click", async (event) => {

      event.preventDefault();
      const _csrf = document.querySelector('#token').value;

      const commentBody = document.createElement('div');
      commentBody.classList.add('commentBody');

      const userInput = document.querySelector('.user-comment-input').value
      commentBody.innerText = userInput;
      document.querySelector('.user-comment-input').value = '';

      const storyId = event.target.dataset.storyId;
      const body = { body: userInput, _csrf }
      if(userInput === '') return
      try {
        const commentResponse = await fetch(`/stories/${storyId}/comments`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });


        const commentData = await commentResponse.json();
        const { id, userId, firstName, lastName, updatedAt } = commentData

        //Creating Edit buttton
        const editBtn = document.createElement('button');
        editBtn.setAttribute('value', id)
        editBtn.className += 'editBtn ';
        editBtn.className += `editBtn-${id} `;
        editBtn.className += 'btn';
        editBtn.innerText = 'Edit'
        //-------------------------------------------------------
        //Creating delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('value', id)
        deleteBtn.className += 'deleteBtn ';
        deleteBtn.className += `deleteBtn-${id} `;
        deleteBtn.className += 'btn';
        deleteBtn.innerText = 'Delete'
        //-------------------------------------------------------
        //Creating edit cancel button
        const editCancelBtn = document.createElement('button');
        editCancelBtn.setAttribute('value', id)
        editCancelBtn.className += 'editCancelBtn ';
        editCancelBtn.className += `editCancelBtn-${id} `;
        editCancelBtn.className += 'btn';
        editCancelBtn.innerText = 'Cancel'
        //-------------------------------------------------------
        //Creating edit submit button
        const editSubmitBtn = document.createElement('button');
        editSubmitBtn.setAttribute('value', id)
        editSubmitBtn.className += 'editSubmitBtn ';
        editSubmitBtn.className += `editSubmitBtn-${id} `;
        editSubmitBtn.className += 'btn';
        editSubmitBtn.innerText = 'Submit'
        //-------------------------------------------------------
        //Create divs for comment
        const commentID = document.createElement('div');
        commentID.className += `comment-${id}`;

        const comments = document.createElement('div');
        comments.classList.add('comments')

        const commenterInfo = document.createElement("div")
        commenterInfo.classList.add('commentInfo')

        const commentBugInfo = document.createElement('div');
        commentBugInfo.classList.add('commneterInfo');

        const commenterName = document.createElement('div');
        commenterName.classList.add('commenterName');

        const commneterFristName = document.createElement('span');
        commneterFristName.setAttribute('id', 'commenter-first-name');
        commneterFristName.innerText = `${firstName}`

        const divPlaceholder = document.createElement('div')

        const commneterLastName = document.createElement('span');
        commneterLastName.setAttribute('id', 'commenter-last-name');
        commneterLastName.innerText = `${lastName}`

        const commentDate = document.createElement('div');
        commentDate.classList.add('comment-date');
        commentDate.innerText = `${updatedAt}`

        const commentButtons = document.createElement("div")
        commentButtons.classList.add('commentButtons');

        const commentContent = document.createElement("div")
        commentContent.classList.add('commentContent');
        //-------------------------------------------------------
        // EventListener for edit button
        editBtn.addEventListener("click", async (event) => {
            editSubmitBtn.hidden= false
            editCancelBtn.hidden= true
            deleteBtn.hidden= true
            editBtn.hidden= false
            commentBody.setAttribute("contenteditable","true")
            event.preventDefault()
          })
        //-------------------------------------------------------
        // Event Listner for delete button
        deleteBtn.addEventListener("click", async (event) => {
          editSubmitBtn.hidden= false
          editCancelBtn.hidden= true
          deleteBtn.hidden= true
          editBtn.hidden= false
          commentBody.setAttribute("contenteditable","false")
          comments.remove()
          event.preventDefault()

          try {
            const res = await fetch(`/api/comments/${id}/delete`, {
              method: "DELETE",
              body: JSON.stringify(body),
              headers: { "Content-Type": "application/json" },
            });
          } catch (e) {
              console.log("Failed to fetch comments", e);
          }
        })
        //-------------------------------------------------------
        // Event Listner for edit cancel button
        editCancelBtn.addEventListener("click", async (event) => {
          editSubmitBtn.hidden= true
          editCancelBtn.hidden= true
          deleteBtn.hidden= false
          editBtn.hidden= false
          commentBody.setAttribute("contenteditable","false")
          event.preventDefault()
          })
        //-------------------------------------------------------
        // Event Listner for edit submit button
        editSubmitBtn.addEventListener("click", async (event) => {
          editSubmitBtn.hidden= true
          editCancelBtn.hidden= true
          deleteBtn.hidden= false
          editBtn.hidden= false
          commentBody.setAttribute("contenteditable","false")
          event.preventDefault()

          const bodyText = commentBody.childNodes[0].nodeValue

          try {
            const res = await fetch(`/api/comments/${id}/edit`, {
              method: "POST",
              body: JSON.stringify({body:bodyText}),
              headers: { "Content-Type": "application/json" },
            });
          } catch (e) {
              console.log("Failed to fetch comments", e);
            }
          })
        // Appending buttons to comment button div
        commentButtons.appendChild(editBtn);
        commentButtons.appendChild(deleteBtn);
        commentButtons.appendChild(editCancelBtn);
        commentButtons.appendChild(editSubmitBtn);
        //---------------------------------------------------------------------
        // Appending users first, last name to user name div
        commenterName.appendChild(commneterFristName)
        commenterName.appendChild(commneterLastName)
        //--------------------------------------------------------------------
        // Appending buttons to the users input text
        commentBody.appendChild(commentContent)
        // Appending a div to button div
        // Appending the users info to the comment
        commenterInfo.appendChild(commenterName)
        commenterInfo.appendChild(commentDate)
        comments.appendChild(commentID);
        comments.appendChild(commentBugInfo)
        // comments.appendChild(divPlaceholder)
        comments.appendChild(commenterInfo)
        comments.appendChild(commentBody)
        comments.appendChild(commentButtons);
        // Appending comment to the list of comments
        commentList.prepend(comments);
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------

        //---------------------------------------------------------------------
        // Setting buttonto be hidden by defualt
        editCancelBtn.hidden= true
        editSubmitBtn.hidden= true
        //---------------------------------------------------------------------

      } catch (e) {
        console.log("Failed to fetch comments", e);
      }
    });
  }
  const likeBtn = document.querySelector('#likes-box')
  if(likeBtn)
    likeBtn.addEventListener('click', async(event) => {
      const storyId = event.target.dataset.storyId;
      try {
        const res = await fetch(`/api/stories/${storyId}/likes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const { likesCount } = await res.json();

        likeBtn.innerText = `LIKES: ${likesCount}`

      } catch (e) {
          console.log("Failed to fetch comments", e);
      }
    })
})
