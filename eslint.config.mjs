import antfu from '@antfu/eslint-config';

export default antfu({
    ignores: ['node_modules', 'dist', 'cjs', 'es'],
    rules: {
        /** style */
        'style/indent': ['error', 4],
        'style/semi': ['error', 'always'],
        'style/jsx-indent-props': ['error', 4],
        'style/object-curly-spacing': ['error', 'never'],
        'style/block-spacing': ['error', 'never'],
        'style/brace-style': ['off'],
        'style/arrow-parens': ['error', 'as-needed'],
        'style/no-trailing-spaces': ['error'],
        'style/member-delimiter-style': ['error', {
            multiline: {
                delimiter: 'semi',
                requireLast: true,
            },
            singleline: {
                delimiter: 'semi',
                requireLast: true,
            },
        }],
        'style/jsx-self-closing-comp': ['error', {
            component: true,
            html: true,
        }],
        'no-console': ['error', {
            allow: ['info', 'warn', 'error'],
        }],
        'perfectionist/sort-named-exports': [0],
        /** https://perfectionist.dev/rules/sort-imports.html */
        'perfectionist/sort-imports': ['error', {
            groups: [
                'react',
                ['builtin', 'external'],
                'internal',
                ['parent', 'sibling', 'index'],
                'object',
                'style',
                ['internal-type', 'parent-type', 'sibling-type', 'index-type', 'type'],
                'unknown',
            ],
            customGroups: {
                type: {
                    react: ['^react$', '^react-.+'],
                },
                value: {
                    react: ['^react$', '^react-.+'],
                    style: ['style$'],
                },
            },
        }],
        'antfu/consistent-list-newline': ['off'],
    },
});
