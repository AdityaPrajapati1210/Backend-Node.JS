(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


  function addreview(){
    const reviewForm = document.getElementById("reviewForm");
    if (reviewForm) {
      reviewForm.classList.remove("hidden");
    }
  }

  function cancelReview(){
    const reviewForm = document.getElementById("reviewForm");
    const formSubmit = document.getElementById("reviewFormSubmit");
    if (formSubmit) {
      formSubmit.reset();
    }
    if (reviewForm) {
      reviewForm.classList.add("hidden");
    }
  }



  const reviewFormSubmit = document.getElementById("reviewFormSubmit");
  if (reviewFormSubmit) {
    reviewFormSubmit.addEventListener("submit", async function (e) {

      e.preventDefault();

      const form = e.target;

      const formData = new FormData(form);

      const response = await fetch(form.action, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              rating: formData.get("rating"),
              comment: formData.get("comment")
          })
      });

      if (response.ok) {

          const review = await response.json();

          const reviewContainer =
              document.getElementById("reviewContainer");

          if (reviewContainer) {
              const reviewCard = document.createElement("div");

              reviewCard.className =
                  "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md";

              const actionUrl = form.getAttribute("action") || "";
              const listingIdMatch = actionUrl.match(/\/listing\/([^\/]+)\/review/);
              const listingId = listingIdMatch ? listingIdMatch[1] : "";

              let deleteButtonHtml = "";
              if (review._id && listingId) {
                  deleteButtonHtml = `
                      <form action="/listing/${listingId}/review/${review._id}?_method=DELETE" method="Post">
                          <button type="submit"
                              class="w-full rounded px-6 py-2 font-semibold text-black border-2 border-red-700 shadow-sm transition hover:bg-red-600 hover:shadow-md sm:w-auto relative right-1.5">Remove</button>
                      </form>
                  `;
              }

              reviewCard.innerHTML = `
                  <div>
                      <span class="rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-700">
                          ⭐ ${review.rating}
                      </span>
                  </div>

                  <p class="mt-4 leading-6 text-gray-600">
                      ${review.comment}
                  </p>
                  ${deleteButtonHtml}
              `;

              reviewContainer.appendChild(reviewCard);
          }

          const noReviews = document.getElementById("noReviews");
          if (noReviews) {
              noReviews.classList.add("hidden");
          }

          cancelReview();
      }
    });
  }