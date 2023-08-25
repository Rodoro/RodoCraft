async function updateValue(field, amount){
    const input = document.getElementById(field);
      if (field == "experience") {
        const input2 = document.getElementById("lvl")
        const updateValue = await upLvl(parseInt(input2.value), parseInt(input.value) + amount);
        input.value = updateValue.exp;
        input2.value = updateValue.lvl;
      } else {
        input.value = parseInt(input.value) + amount;
      }
}
async function upLvl(lvl, exp) {
    try {
      const response = await fetch('/admin/direction/vipstatus/config');
      const data = await response.json();

      if (exp >= data.lvlBorder[lvl - 1]) {
        lvl += 1;
      }
      return {
        lvl,
        exp
      };
    } catch (error) {
      console.error(error);
      return {
        lvl,
        exp
      };
    }
  }

  async  function increaseValue(field) {
    const input = document.getElementById(field);
    const response = await fetch('/admin/direction/vipstatus/config');
    const data = await response.json();
    if (input.value < data.lvlBorder.length + 1) {
        input.value++;
    }
  }
  
  async function decreaseValue(field) {
    const input = document.getElementById(field);
    if (input.value > 1) {
        input.value--;
    }
  }