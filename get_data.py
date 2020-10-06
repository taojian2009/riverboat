import pandas as pd

df = pd.DataFrame({'personnel_number': ['123', '345', '567', '789', '000', '4444'],
                   'expiry_date': ['2020-12-07', '2099-12-04', '2019-08-30', '2022-03-19', '2020-09-06', '9999-12-31']})

df['expiry_date'] = df['expiry_date'].map(lambda x: pd.to_datetime(x).strftime('%Y-%m-%d'))

print(df)
