"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    clearMocks: true,
    coverageProvider: "v8",
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
    roots: ["<rootDir>/src"],
    testMatch: ["**/__test__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    }
};
