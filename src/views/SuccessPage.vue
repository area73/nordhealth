<template>
  <div class="success n-typeset">
    <h2>Thank you for signing up for Condrovet Force HA!</h2>
    <p>Your registration was successful.</p>
    <p>
      We’ve sent a confirmation email with all the details you need to get started. If you have any
      questions or need further assistance, please don’t hesitate to contact our support team.
    </p>

    <p>Welcome aboard, and we look forward to helping you make the most of our new product!</p>
  </div>
</template>

<style>
.success {
  padding: 64px 64px 64px 250px;
  background-image: url('../assets/cat.webp');
  background-repeat: no-repeat;
  background-position: bottom left;
  background-size: 250px;
  border-radius: 0 0 4px 4px;
  border: 1px solid var(--n-color-border);
}

@media (max-width: 768px) {
  .success {
    padding: 32px;
    background-image: none;
  }
}
</style>
