// mock/index.ts
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

export function mockXHR() {
  const mock = new MockAdapter(axios);

  // 模拟登录请求
  mock.onPost("/api/login").reply((config) => {
    const { username, password } = JSON.parse(config.data);
    if (username === "admin" && password === "123456") {
      return [200, { token: "mocked_token" }];
    } else {
      return [401, { message: "用户名或密码错误" }];
    }
  });

  // 模拟机器列表请求
  mock.onGet("/api/machines").reply((config) => {
    // 模拟的机器数据
  

    const machines = [
      {
        id: 1,
        name: 'RBBA21AVB02693',
        serialNumber: 'RBBA21AVB02693',
        modelNumber: 'EVOLVE 200 PLUS',
        owner: '深圳市佳士科技股份有限公司',
        variant: 'Default',
        machineFirmware: null,
        userInterfaceFirmware: null,
        registrationDate: 'September 25, 2024, 3:28 pm',
        lastUsed: '不适用',
        machineType: '通用试验机',
        forcedMachineFirmware: null,
        forcedUserInterfaceFirmware: null
      },
      {
        id: 2,
        name: 'RBXA21BIB01702',
        serialNumber: 'RBXA21BIB01702',
        modelNumber: 'EVOLVE 200 PLUS',
        owner: 'Will, Price and Lueilwitz',
        variant: 'Default',
        machineFirmware: '1.2.3.0',
        userInterfaceFirmware: '1.0.3.0',
        registrationDate: 'September 30, 2024, 11:08 am',
        lastUsed: 'May 20, 2022, 1:23 pm',
        machineType: '佳士试验机',
        forcedMachineFirmware: null,
        forcedUserInterfaceFirmware: null
      },
      {
        id: 3,
        name: 'RBCA21BIB01703',
        serialNumber: 'RBCA21BIB01703',
        modelNumber: 'EVOLVE 300',
        owner: '佳士科技',
        variant: 'Default',
        machineFirmware: '2.0.0.0',
        userInterfaceFirmware: '1.0.0.0',
        registrationDate: 'September 20, 2024, 10:00 am',
        lastUsed: 'June 1, 2022, 10:00 am',
        machineType: '测试试验机',
        forcedMachineFirmware: null,
        forcedUserInterfaceFirmware: null
      },
      {
        id: 4,
        name: 'RBCA21BIB01703',
        serialNumber: 'RBCA21BIB01703',
        modelNumber: 'EVOLVE 300',
        owner: '佳士科技',
        variant: 'Default',
        machineFirmware: '2.0.0.0',
        userInterfaceFirmware: '1.0.0.0',
        registrationDate: 'September 20, 2024, 10:00 am',
        lastUsed: 'June 1, 2022, 10:00 am',
        machineType: '测试试验机',
        forcedMachineFirmware: null,
        forcedUserInterfaceFirmware: null
      },
      {
        id: 5,
        name: 'RBCA21BIB01703',
        serialNumber: 'RBCA21BIB01703',
        modelNumber: 'EVOLVE 300',
        owner: '佳士科技',
        variant: 'Default',
        machineFirmware: '2.0.0.0',
        userInterfaceFirmware: '1.0.0.0',
        registrationDate: 'September 20, 2024, 10:00 am',
        lastUsed: 'June 1, 2022, 10:00 am',
        machineType: '测试试验机',
        forcedMachineFirmware: null,
        forcedUserInterfaceFirmware: null
      },
      {
        id: 6,
        name: 'RBCA21BIB01703',
        serialNumber: 'RBCA21BIB01703',
        modelNumber: 'EVOLVE 300',
        owner: '佳士科技',
        variant: 'Default',
        machineFirmware: '2.0.0.0',
        userInterfaceFirmware: '1.0.0.0',
        registrationDate: 'September 20, 2024, 10:00 am',
        lastUsed: 'June 1, 2022, 10:00 am',
        machineType: '测试试验机',
        forcedMachineFirmware: null,
        forcedUserInterfaceFirmware: null
      },
      {
        id: 7,
        name: 'RBCA21BIB01703',
        serialNumber: 'RBCA21BIB01703',
        modelNumber: 'EVOLVE 300',
        owner: '佳士科技',
        variant: 'Default',
        machineFirmware: '2.0.0.0',
        userInterfaceFirmware: '1.0.0.0',
        registrationDate: 'September 20, 2024, 10:00 am',
        lastUsed: 'June 1, 2022, 10:00 am',
        machineType: '测试试验机',
        forcedMachineFirmware: null,
        forcedUserInterfaceFirmware: null
      },
      {
        id: 8,
        name: 'RBCA21BIB01703',
        serialNumber: 'RBCA21BIB01703',
        modelNumber: 'EVOLVE 300',
        owner: '佳士科技',
        variant: 'Default',
        machineFirmware: '2.0.0.0',
        userInterfaceFirmware: '1.0.0.0',
        registrationDate: 'September 20, 2024, 10:00 am',
        lastUsed: 'June 1, 2022, 10:00 am',
        machineType: '测试试验机',
        forcedMachineFirmware: null,
        forcedUserInterfaceFirmware: null
      },
      {
        id: 9,
        name: 'RBCA21BIB01703',
        serialNumber: 'RBCA21BIB01703',
        modelNumber: 'EVOLVE 300',
        owner: '佳士科技',
        variant: 'Default',
        machineFirmware: '2.0.0.0',
        userInterfaceFirmware: '1.0.0.0',
        registrationDate: 'September 20, 2024, 10:00 am',
        lastUsed: 'June 1, 2022, 10:00 am',
        machineType: '测试试验机',
        forcedMachineFirmware: null,
        forcedUserInterfaceFirmware: null
      },
      {
        id: 10,
        name: 'RBCA21BIB01703',
        serialNumber: 'RBCA21BIB01703',
        modelNumber: 'EVOLVE 300',
        owner: '佳士科技',
        variant: 'Default',
        machineFirmware: '2.0.0.0',
        userInterfaceFirmware: '1.0.0.0',
        registrationDate: 'September 20, 2024, 10:00 am',
        lastUsed: 'June 1, 2022, 10:00 am',
        machineType: '测试试验机',
        forcedMachineFirmware: null,
        forcedUserInterfaceFirmware: null
      },
      {
        id: 11,
        name: 'RBCA21BIB01703',
        serialNumber: 'RBCA21BIB01703',
        modelNumber: 'EVOLVE 300',
        owner: '佳士科技',
        variant: 'Default',
        machineFirmware: '2.0.0.0',
        userInterfaceFirmware: '1.0.0.0',
        registrationDate: 'September 20, 2024, 10:00 am',
        lastUsed: 'June 1, 2022, 10:00 am',
        machineType: '测试试验机',
        forcedMachineFirmware: null,
        forcedUserInterfaceFirmware: null
      },
      {
        id: 12,
        name: 'RBCA21BIB01703',
        serialNumber: 'RBCA21BIB01703',
        modelNumber: 'EVOLVE 300',
        owner: '佳士科技',
        variant: 'Default',
        machineFirmware: '2.0.0.0',
        userInterfaceFirmware: '1.0.0.0',
        registrationDate: 'September 20, 2024, 10:00 am',
        lastUsed: 'June 1, 2022, 10:00 am',
        machineType: '测试试验机',
        forcedMachineFirmware: null,
        forcedUserInterfaceFirmware: null
      },
      {
        id: 13,
        name: 'RBCA21BIB01703',
        serialNumber: 'RBCA21BIB01703',
        modelNumber: 'EVOLVE 300',
        owner: '佳士科技',
        variant: 'Default',
        machineFirmware: '2.0.0.0',
        userInterfaceFirmware: '1.0.0.0',
        registrationDate: 'September 20, 2024, 10:00 am',
        lastUsed: 'June 1, 2022, 10:00 am',
        machineType: '测试试验机',
        forcedMachineFirmware: null,
        forcedUserInterfaceFirmware: null
      },
      {
        id: 14,
        name: 'RBCA21BIB01703',
        serialNumber: 'RBCA21BIB01703',
        modelNumber: 'EVOLVE 300',
        owner: '佳士科技',
        variant: 'Default',
        machineFirmware: '2.0.0.0',
        userInterfaceFirmware: '1.0.0.0',
        registrationDate: 'September 20, 2024, 10:00 am',
        lastUsed: 'June 1, 2022, 10:00 am',
        machineType: '测试试验机',
        forcedMachineFirmware: null,
        forcedUserInterfaceFirmware: null
      },
      {
        id: 15,
        name: 'RBCA21BIB01703',
        serialNumber: 'RBCA21BIB01703',
        modelNumber: 'EVOLVE 300',
        owner: '佳士科技',
        variant: 'Default',
        machineFirmware: '2.0.0.0',
        userInterfaceFirmware: '1.0.0.0',
        registrationDate: 'September 20, 2024, 10:00 am',
        lastUsed: 'June 1, 2022, 10:00 am',
        machineType: '测试试验机',
        forcedMachineFirmware: null,
        forcedUserInterfaceFirmware: null
      },
      // 更多示例数据可以添加在此
    ];
    
    // 从 config.params 获取分页和搜索条件
    const { page = 1, pageSize = 10, name, serialNumber, modelNumber, owner } = config.params;

    // 根据搜索条件过滤数据
    let filteredMachines = machines.filter((machine) => {
      return (
        (!name || machine.name.includes(name)) &&
        (!serialNumber || machine.serialNumber.includes(serialNumber)) &&
        (!modelNumber || machine.modelNumber.includes(modelNumber)) &&
        (!owner || machine.owner.includes(owner))
      );
    });

    // 分页处理
    const total = filteredMachines.length;
    const start = (page - 1) * pageSize;
    const end = start + parseInt(pageSize, 10);
    const paginatedMachines = filteredMachines.slice(start, end);

    // 返回分页后的数据和总条目数，保持每条数据包含所有字段
    return [200, { items: paginatedMachines, total }];
  });
}
