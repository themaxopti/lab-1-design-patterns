module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
    ],
    plugins: [],
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
                "@typescript-eslint/no-require-imports": "off",
                "@typescript-eslint/no-explicit-any": 'off'

            }
        }
    ],
};
