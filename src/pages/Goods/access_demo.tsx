import React from 'react';
import { useAccess, Access } from 'umi';

const PageA = (props) => {
  const { foo } = props;
  const access = useAccess(); // access 的成员: canReadFoo, canUpdateFoo, canDeleteFoo

  if (access.canDeleteFoo) {
    // 如果可以读取 Foo，则...
  }

  return (
    <div>
      <Access
        accessible={access.test}
        fallback={<div>Can not read foo content.</div>}
      >
        Foo content.
      </Access>
      {/* <Access
        accessible={access.canUpdateFoo}
        fallback={<div>Can not update foo.</div>}
      >
        Update foo.
      </Access>
      <Access
        accessible={access.canDeleteFoo(foo)}
        fallback={<div>Can not delete foo.</div>}
      >
        Delete foo.
      </Access> */}
    </div>
  );
};
export default PageA;
