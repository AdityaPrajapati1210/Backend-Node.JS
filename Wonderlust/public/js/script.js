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
    reviewForm.classList.remove("hidden");
  }

  function cancelReview(){
    const reviewForm = document.getElementById("reviewForm");
    document.getElementById("reviewFormSubmit").reset();
    reviewForm.classList.add("hidden");
  }



  document.getElementById("reviewFormSubmit").addEventListener("submit", async function (e) {

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

        const reviewCard = document.createElement("div");

        reviewCard.className =
            "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm";

        reviewCard.innerHTML = `
            <div>
                <span class="rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-700">
                    ⭐ ${review.rating}
                </span>
            </div>

            <p class="mt-4 leading-6 text-gray-600">
                ${review.comment}
            </p>
        `;

        reviewContainer.appendChild(reviewCard);
        document.getElementById("noReviews").classList.add("hidden");

        cancelReview();
        form.reset();
    }
});