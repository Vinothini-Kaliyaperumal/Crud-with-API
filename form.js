let editvalue;

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  editvalue = urlParams.get("id");

  if (editvalue) {
    loadStudentData(editvalue);
  }
};

async function loadStudentData(id) {
  const apiUrl = `https://6684d4e456e7503d1ae14dde.mockapi.io/employee/${id}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching student data: ${response.statusText}`);
    }
    const student = await response.json();
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("number").value = student.number;
    document.getElementById("password").value = student.password;
    document.getElementById("c_password").value = student.c_password;
    document.getElementById("date").value = student.date;

    if (student.gender === "male") {
      document.getElementById("dot-1").checked = true;
    } else if (student.gender === "female") {
      document.getElementById("dot-2").checked = true;
    }

    const languageCheckboxes = document.querySelectorAll('input[name="language"]');
    languageCheckboxes.forEach(checkbox => {
      checkbox.checked = student.language.includes(checkbox.value);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const number = document.getElementById("number").value.trim();
  const password = document.getElementById("password").value.trim();
  const c_password = document.getElementById("c_password").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const languages = Array.from(document.querySelectorAll('input[name="language"]:checked')).map(el => el.value);
  const date = document.getElementById("date").value;
  let isValid = true;

  if (name.length < 3) {
    document.getElementById("name_req").textContent = "Name required**";
    isValid = false;
  } else {
    document.getElementById("name_req").textContent = "";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("email_req").textContent = "Email required**";
    isValid = false;
  } else {
    document.getElementById("email_req").textContent = "";
  }

  if (!/^\d{3}-\d{3}-\d{4}$/.test(number)) {
    document.getElementById("num_req").textContent = "Number required**";
    isValid = false;
  } else {
    document.getElementById("num_req").textContent = "";
  }

 const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{5,20}$/;

if (!passwordPattern.test(password)) {
    document.getElementById("password_req").textContent = "Password required**";
    isValid = false;
} else {
    document.getElementById("password_req").textContent = "";
}

if (c_password !== password) {
    document.getElementById("c_password_req").textContent = "Passwords do not match**";
    isValid = false;
} else {
    document.getElementById("c_password_req").textContent = "";
}

    if (c_password !== password) {
        document.getElementById("c_password_req").textContent = "Passwords do not match**";
        isValid = false;
    } else {
        document.getElementById("c_password_req").textContent = "";
    }

    if (!gender) {
        document.getElementById("gender_req").textContent = "Gender required**";
        isValid = false;
    } else {
        document.getElementById("gender_req").textContent = "";
    }

    if (languages.length === 0) {
        document.getElementById("lang_req").textContent = "Language required**";
        isValid = false;
    } else {
        document.getElementById("lang_req").textContent = "";
    }

    // if (!date) {
    //     document.getElementById("dob_req").textContent = "Date of birth required**";
    //     isValid = false;
    // } else {
    //     document.getElementById("dob_req").textContent = "";
    // }


    const dobPattern = /^\d{2}\?\d{2}\?\d{4}$/;

    if (!dobPattern.test(date)) {
      document.getElementById("dob_req").textContent = 'Date of birth required';
    } else {
      document.getElementById("dob_req").textContent = '';
    }
    return isValid;
}

function submitForm(event) {
    event.preventDefault();

    if (!validateForm()) {
        return false;
    }

    const studentData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        number: document.getElementById("number").value.trim(),
        password: document.getElementById("password").value.trim(),
        c_password: document.getElementById("c_password").value.trim(),
        gender: document.querySelector('input[name="gender"]:checked')?.value,
        language: Array.from(document.querySelectorAll('input[name="language"]:checked')).map(el => el.value),
        date: document.getElementById("date").value
    };

    sendData(studentData);
    return false;
}

async function sendData(data) {
    try {
        const apiUrl = editvalue 
            ? `https://6684d4e456e7503d1ae14dde.mockapi.io/employee/${editvalue}`
            : "https://6684d4e456e7503d1ae14dde.mockapi.io/employee";
        
        const method = editvalue ? "PUT" : "POST";
        const response = await fetch(apiUrl, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Success:', result);
        window.location.href = "table.html";
    } catch (error) {
        console.error('Error:', error);
    }
}

function table() {
    window.location.href = "table.html";
}



