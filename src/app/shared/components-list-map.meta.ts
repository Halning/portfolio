export const COMPONENT_LIST_DATA = function () {

    const componentsRegister = new Map();

    const setData = (data) => {
        componentsRegister.set(data.key, data.component);
    };

    const getComponent = (id) => {
        return componentsRegister.get(id);
    };

    return {
        setData: setData,
        getComponent: getComponent
    };
}();

export const RegisterComponent: Function = (name: string): ClassDecorator => {
    return (target: Function) => {
        COMPONENT_LIST_DATA.setData({key: name, component: target});
    };
};

declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
