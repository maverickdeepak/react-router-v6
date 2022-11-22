import React, { Suspense } from "react";

const SuspenseFile = (Component) => (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

export default SuspenseFile;
