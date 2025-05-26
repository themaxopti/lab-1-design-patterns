module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    plugins: ["@typescript-eslint"],
    env: {
        node: true,
        es6: true
    },
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "no-console": "off",
        "@typescript-eslint/no-require-imports": "off"
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            rules: {
                "@typescript-eslint/no-require-imports": "off"
            }
        }
    ],
};
