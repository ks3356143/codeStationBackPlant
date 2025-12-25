import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useSelector } from '@umijs/max';
import { Button, Modal } from 'antd';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import adminApi from '@/api/admin';
import AdminForm from './components/AdminForm';
import useAdminTable from './hooks/useAdminTable';
import type { DataType } from './types';

// 管理员一级页面
const Admin = () => {
  // 弹窗相关内容
  const [open, setOpen] = useState(false);

  // 定义异步函数
  const [isPending, startTransition] = useTransition();

  // 编辑表单初始数据
  const initAdminInfo = {
    id: '',
    password: '',
    username: '',
    name: '',
    avatar: [],
    permission: 2,
  };
  const [adminInfo, setAdminInfo] = useState<DataType>({
    ...initAdminInfo,
  });

  // 点击编辑打开弹窗
  const handleEditOpen = (record: any) => {
    // 修改editData
    setAdminInfo({
      ...record,
      avatar: record.avatar
        ? [
            {
              uid: '-1',
              name: 'avatar',
              status: 'done', // 表示已上传成功
              url: API_URL + record.avatar, // 完整的图片访问地址
            },
          ]
        : [],
    });
    setOpen(true);
  };

  // 点击提交按钮
  const submitEdit = async (reset: Function) => {
    startTransition(async () => {
      try {
        const commitData = {
          ...adminInfo,
          avatar:
            adminInfo.avatar!.length > 0
              ? adminInfo.avatar![0].url.replaceAll(API_URL + '/media/', '')
              : '',
        };
        await adminApi.modify_admin(adminInfo.id!, commitData);
        dispatch({
          type: 'admin/_initAdminList',
        });
        setAdminInfo({ ...initAdminInfo });
        setOpen(false);
        reset();
        toast.success('修改成功!');
      } catch (e: any) {
        const errorData = e.response.data;
        toast.error(errorData.errorMessage);
      }
    });
    reset();
  };

  // 从仓库获取管理员数据
  const { adminList } = useSelector((state: any) => state.admin);
  const { columns, dispatch } = useAdminTable(handleEditOpen);

  // 页面加载后请求初始化数据
  useEffect(() => {
    if (!adminList.length) {
      dispatch({
        type: 'admin/_initAdminList',
      });
    }
  }, []);

  return (
    <div>
      <PageContainer>
        <Button
          type="primary"
          style={{ marginBottom: 10, width: 100 }}
          onClick={() =>
            dispatch({
              type: 'admin/_initAdminList',
            })
          }
        >
          刷新列表
        </Button>
        <ProTable
          headerTitle="管理员列表"
          dataSource={adminList}
          rowKey={(row) => row.id}
          options={{
            reload: false, // 隐藏默认刷新按钮
            density: true,
            setting: true,
          }}
          columns={columns}
          search={false}
          pagination={{
            pageSize: 5,
          }}
        ></ProTable>
      </PageContainer>
      {/* 弹窗表单 */}
      <Modal
        title="修改管理员"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <AdminForm
          adminInfo={adminInfo}
          setAdminInfo={setAdminInfo}
          submitClick={submitEdit}
          submitting={isPending}
          open={open}
        ></AdminForm>
      </Modal>
    </div>
  );
};

export default Admin;
