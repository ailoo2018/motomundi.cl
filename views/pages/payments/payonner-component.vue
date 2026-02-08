<script setup>
const props = defineProps({
  longId: { type: String, required: true }
});

onMounted(() => {
  // 1. Create the script tag
  const script = document.createElement('script');
  script.src = "https://resources.sandbox.oscato.com/web/libraries/checkout-web/umd/checkout-web-1.14.0.min.js";
  script.async = true;
  script.crossOrigin = "anonymous";

  // 2. THIS IS WHERE THE LOGIC GOES
  script.onload = async () => {
    try {
      const checkout = await window.Payoneer.CheckoutWeb({
        env: "test",
        longId: props.longId,
      });

      console.log("Payoneer SDK initialized. Available methods:", Object.keys(checkout));

      // 1. Try the most direct 'dropIn' method first (Modern standard)
      if (typeof checkout.dropIn === 'function') {
        await checkout.dropIn('#payoneer-widget-container');
        console.log("Mounted using .dropIn()");
        return;
      }

      // 2. Try the component factory pattern with alternative names
      const componentNames = ["checkout", "drop-in", "cards"];
      let component;

      for (const name of componentNames) {
        try {
          component = checkout.createComponent(name);
          if (component) {
            console.log(`Successfully created component: ${name}`);
            break;
          }
        } catch (e) {
          // Continue to next name
        }
      }

      if (component) {
        await component.mount('#payoneer-widget-container');
      } else {
        throw new Error("SDK loaded but no valid checkout component could be initialized.");
      }

    } catch (err) {
      console.error("Payoneer Mounting Error:", err);
    }
  };
  // 3. Finally, append it to the page to trigger the load
  document.head.appendChild(script);
});
</script>
