const getHeader = {
  headers: {
    Accept: "application/json"
  }
};

const postHeader = {
  method: "POST",
  headers: {
    ...getHeader,
    "Content-Type": "application/json"
  }
};

export const getCertificate = certificateId =>
  fetch(`/certificate/data/${certificateId}`, getHeader).then(res =>
    res.json()
  );

export const verifyCertificate = certificateId =>
  fetch(`/certificate/verify/${certificateId}`, getHeader).then(res => {
    if (res.status === 200) return true;
    else if (res.status === 401) return false;
  });

export const generateCertificate = (
  candidateName,
  courseName,
  orgName,
  assignDate,
  duration,
  emailId
) =>
  fetch(`/certificate/generate`, {
    ...postHeader,
    body: JSON.stringify({
      candidateName,
      courseName,
      orgName,
      assignDate,
      duration,
      emailId
    })
  }).then(res => res.json());
