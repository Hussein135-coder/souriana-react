export function loginValidation(data, userNameErrors, passwordErrors) {
  if (data.identifier.length == 0) {
    userNameErrors.push("اسم المستخدم مطلوب");
  }
  if (data.identifier.length < 3) {
    userNameErrors.push("اسم المستخدم ٣ أحرف على الأقل");
  }
  if (data.password.length == 0) {
    passwordErrors.push("كلمة السر مطلوبة");
  }
  if (data.password.length < 6) {
    passwordErrors.push("كلمة السر ٦ أحرف على الأقل");
  }
}

export function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));

  return user?.token;
}

export function setToken(user) {
  if (user.token) {
    localStorage.setItem("user", user);
  }
}

export function removeToken() {
  localStorage.removeItem("user");
}

export function analyiseMoney(money, status) {
  let count = 0;
  let moneyNumber = 0;

  for (const item of money) {
    if (status == item.attributes.status || status == "total") {
      count++;
      moneyNumber += Number(item.attributes.number);
    }
  }

  return { count, moneyNumber };
}

export function moneyValidation(
  data,
  nameErrors,
  numberErrors,
  companyErrors,
  dateErrors
) {
  if (data.name.length == 0) {
    nameErrors.push("الاسم مطلوب");
  }
  if (data.name.length < 3) {
    nameErrors.push("الاسم ٣ أحرف على الأقل");
  }
  if (data.number.length == 0) {
    numberErrors.push("المبلغ مطلوب");
  }
  if (data.number.length > 8) {
    numberErrors.push("أدخل أقل من 8 أرقام");
  }
  if (data.number.length < 4) {
    numberErrors.push("أدخل أكثر من 3 أرقام");
  }
  if (data.company.length == 0) {
    companyErrors.push("اسم الشركة مطلوب");
  }
  if (data.date.length == 0) {
    dateErrors.push("التاريخ مطلوب");
  }
}

export function analyticsValidatioin(
  data,
  facebookErrors,
  telegramErrors,
  instaErrors,
  dateErrors
) {
  if (data.likes.length == 0) {
    facebookErrors.push("عدد الاعجابات مطلوب");
  }
  if (data.likes.length < 6) {
    facebookErrors.push("عدد الاعجابات 6 أرقام على الأقل");
  }
  if (data.members.length == 0) {
    telegramErrors.push("عدد المشتركين مطلوب");
  }
  if (data.insta.length == 0) {
    instaErrors.push("عدد المشتركين مطلوب");
  }
  if (data.members.length < 5) {
    telegramErrors.push("عدد المشتركين 5 أرقام على الأقل");
  }
  if (data.date.length == 0) {
    dateErrors.push("التاريخ مطلوب");
  }
}
