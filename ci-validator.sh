source ~/.nvm/nvm.sh
L=""
TU=""
show() {
  printf "\n\n################ ci-validator Summary "
  printf "\n     Linter : $L"
  printf "\n  Unit test : $TU"

  if [ "$L$TU" == "OKOK" ]
  then
    printf "\n                 All OK - Rock'n Roll !"
  else
    printf "\n                 ERRORS ERRORS ERRORS !!!"
    printf "\n                 You must correct !"
  fi;
  printf "\n\n"
}

failure() {
  show
  exit 1
}
L="ERROR"
printf "\n################ CI Validator : LINT + TEST\n"
nvm use;npm install;npm run lint || failure
L="OK"
TU="ERROR"
npm run test || failure
TU="OK"
show