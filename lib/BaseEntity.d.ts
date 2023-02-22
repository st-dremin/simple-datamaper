import 'reflect-metadata';
export declare class BaseEntity {
    constructor(attrs?: any);
    $boot(): void;
    $fill(attrs: Record<string, any>): this;
    private compileRelation;
    private compileCollection;
    protected compileValue(name: string, value: any): any;
    protected setValue(name: string, value: any): void;
}
